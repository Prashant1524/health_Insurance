package com.insurance.uhg.userservice.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

//import com.uhg.project.ecart.filter.JwtRequestFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebConfig {
	
	
	@Autowired
//	private JwtRequestFilter jwtRequestFilter;
	
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		 http.csrf().disable()
         .authorizeHttpRequests()
         .requestMatchers("/users/signin", "/users/signup", "/users/finduser/{email}", "/users/finduser/{id}","/users/updateuser", "/users/getotp", "/users/findall","/users/contact", "/users/admin/signin").permitAll()
         .and()
         .authorizeHttpRequests().requestMatchers("/**")
         .authenticated().and()
         .sessionManagement()
         .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        
//        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
        	
               
    }
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authenticationManger(AuthenticationConfiguration authenticationConfiguration)throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
	
	
	

}


