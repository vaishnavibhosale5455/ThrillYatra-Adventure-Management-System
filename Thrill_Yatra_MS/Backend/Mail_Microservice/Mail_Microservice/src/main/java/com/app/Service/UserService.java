package com.app.Service;

public interface UserService {

		boolean existsByEmail(String email);

		boolean updatePassword(String email, String newpassword);
}
