package com.app.Service;

import java.util.List;

import com.app.DTO.UserRequestDto;
import com.app.DTO.UserResponseDto;
import com.app.Entity.User;

public interface UserService {

	
	 User registerUser(UserRequestDto dto);

	 List<UserResponseDto>getAllUsers();
	 

		boolean existsByEmail(String email);

		boolean updatePassword(String email, String newpassword);
}
