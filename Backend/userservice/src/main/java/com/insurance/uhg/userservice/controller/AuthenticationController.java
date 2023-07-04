package com.insurance.uhg.userservice.controller;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.uhg.userservice.dto.AuthenticationDTO;
import com.insurance.uhg.userservice.dto.AuthenticationResponse;
import com.insurance.uhg.userservice.dto.SignupDTO;
import com.insurance.uhg.userservice.model.ERole;
import com.insurance.uhg.userservice.model.Role;
import com.insurance.uhg.userservice.model.User;
import com.insurance.uhg.userservice.repo.RoleRepo;
import com.insurance.uhg.userservice.repo.UserRepo;
import com.insurance.uhg.userservice.service.AuthService;
import com.insurance.uhg.userservice.service.EmailService;
//import com.insurance.uhg.userservice.service.UserDetailImp;
import com.insurance.uhg.userservice.service.UserDetailsServiceImp;
import com.insurance.uhg.userservice.util.JWTUtil;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/users")
public class AuthenticationController {
	
	@Autowired
	private JWTUtil jwtUtil;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserDetailsServiceImp userDetailsService;
	@Autowired
	RoleRepo roleRepository;
	@Autowired
	PasswordEncoder encoder;
	@Autowired
	private UserRepo userrepo;
	@Autowired
	private AuthService service;
	@Autowired
	private EmailService emailService;

	
  
//	public AuthenticationController(AuthenticationManager authenticationManager2,
//			UserDetailsService userDetailsService2, JWTUtil jwtUtil2) {
//		// TODO Auto-generated constructor stub
//	}
	
	 @PostMapping("/signin")
	  public AuthenticationResponse authenticateUser(@Valid @RequestBody AuthenticationDTO authDTO) throws Exception {

	    Authentication auth = authenticationManager
	        .authenticate(new UsernamePasswordAuthenticationToken(authDTO.getEmail(), authDTO.getPassword()));
	    
	    if (auth == null) {
			throw new Exception("Incorrect username or password");
	    }


	    UserDetails userDetails = (UserDetails) auth.getPrincipal();

	    final String jwt = jwtUtil.generateToken(userDetails.getUsername());

	    List<String> roles = userDetails.getAuthorities().stream()
	        .map(item -> item.getAuthority())
	        .collect(Collectors.toList());
	    
	    return new AuthenticationResponse(jwt);
	   
	  }
	 

	 
	  @PostMapping("/signup")
	  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupDTO signupdto) {
	    if (userrepo.existsByEmail(signupdto.getEmail())) {
	      return ResponseEntity.badRequest().body("Error: Email is already in use!");
	    }

	    // Create new user's account
	    User user = new User(signupdto.getId(),
	    					 signupdto.getFirstname(),
	                         signupdto.getLastname(),
	                         signupdto.getPhone(),
	                         signupdto.getEmail(),
	                         encoder.encode(signupdto.getPassword()),
	                         signupdto.getOtp());
	    
//	    System.out.println(signupdto.getRoles());
	    Set<String> strRoles = signupdto.getRoles();
	    
	    Set<Role> roles = new HashSet<>();

	    if (strRoles == null) {
	      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
	          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
	      roles.add(userRole);
	      
	    } else {
	      strRoles.forEach(role -> {
	        switch (role) {
	        case "admin":
	          Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
	              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
	          roles.add(adminRole);

	          break;
	        default:
	          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
	              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
	          roles.add(userRole);
	        }
	      });
	    }
	   
	    user.setRoles(roles);
	  
	    service.saveUser(user);
	    emailService.sendRegistrationSuccessEmail(signupdto.getEmail(),signupdto.getFirstname());

	    return ResponseEntity.ok("User registered successfully!");
	  }

	@GetMapping("/finduser/{email}")		
	public List<User> findByUsername(@PathVariable String email)
	{	
		return service.findUser(email);
	}
	
	
	@GetMapping("/validate")
	public String validateToken(@RequestParam("token") String token) {
		jwtUtil.validateToken(token);
		return "Token is valid";
	}
	
	@PutMapping("/updateuser")
	public void updateUser(@RequestBody User user)
	{	
		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
		service.saveUser(user);
	
	}
	
	@PostMapping("/getotp")
	public void otpVerify(@RequestBody User user){
		service.saveUser(user);
//		emailService.sendOTPMail(user.getEmail(),user.getFirstName(), user.getOtp());
	}
	
	
	
}
