package com.app.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.DTO.UserRequestDto;
import com.app.DTO.UserResponseDto;
import com.app.Entity.Role;
import com.app.Entity.User;
import com.app.Repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	
	  @Autowired
	    private UserRepository userRepository;
	  
	  @Autowired
	  private PasswordEncoder passwordEncoder;

	    @Override
	    public User registerUser(UserRequestDto dto) {

	        if (userRepository.existsByEmail(dto.getEmail())) {
	            throw new RuntimeException("Email already registered");
	        }

	        User user = new User();
	        user.setName(dto.getName());
	        user.setEmail(dto.getEmail());
	        user.setPassword(passwordEncoder.encode(dto.getPassword())); // later encrypt
	        
	        user.setAge(dto.getAge());
	        user.setRole(Role.ROLE_CUSTOMER);   // default role
	       
	        user.setAddress(dto.getAddress());
	        user.setMobileNumber(dto.getMobileNumber());

	        return userRepository.save(user);
	    }
	    public List<UserResponseDto> getAllUsers() {

	        return userRepository.findAll()
	                .stream()
	                .map(this::mapToDto)
	                .collect(Collectors.toList());
	    }

	    private UserResponseDto mapToDto(User user) {

	        UserResponseDto dto = new UserResponseDto();
	        dto.setId(user.getId());
	        dto.setName(user.getName());
	        dto.setEmail(user.getEmail());
	        dto.setAge(user.getAge());
	        dto.setMobileNumber(user.getMobileNumber());
	        dto.setAddress(user.getAddress());
	        dto.setRole(user.getRole());

	        return dto;
	    }
	    
		 @Override
		    public boolean existsByEmail(String email) {
		        return userRepository.findByEmail(email).isPresent();
		    }

		    @Override
		    public boolean updatePassword(String email, String newPassword) {
		        Optional<User> optionalUser = userRepository.findByEmail(email);
		        if (optionalUser.isPresent()) {
		            User user = optionalUser.get();
		            user.setPassword(newPassword); // Encrypt in real applications
		            userRepository.save(user);
		            return true;
		        }
		        return false;
		    }

}
