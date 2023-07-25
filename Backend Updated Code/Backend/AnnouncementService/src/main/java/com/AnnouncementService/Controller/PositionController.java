package com.AnnouncementService.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AnnouncementService.Entity.Position;
import com.AnnouncementService.Repository.PositionRepo;


@RestController
@RequestMapping("/position")
public class PositionController {
	
	@Autowired
	private PositionRepo positionRepo;
	
	@PostMapping("/addPosition")
    public String savePostion(@RequestBody Position pu)
    {
        positionRepo.save(pu);
        return "Position saved";
    }
	
	
	@GetMapping("/getAllPosition")
    public List<Position> getAllPosition()
    {
        return positionRepo.findAll();
    }
	
	@PutMapping("/updatePosition")
    public void updatePosition(@RequestBody Position p)
    {
         positionRepo.save(p);
    }
}
