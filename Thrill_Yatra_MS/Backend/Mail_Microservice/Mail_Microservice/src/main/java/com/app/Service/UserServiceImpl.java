package com.app.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.Entity.User;
import com.app.Repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	
	  @Autowired
	    private UserRepository userRepository;
	  
	  @Autowired
	  private PasswordEncoder passwordEncoder;

	    
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
