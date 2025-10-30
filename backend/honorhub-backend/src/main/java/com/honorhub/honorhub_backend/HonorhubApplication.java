package com.honorhub.honorhub_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.honorhub.honorhub_backend.model.Role;
import com.honorhub.honorhub_backend.model.User;
import com.honorhub.honorhub_backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class HonorhubApplication {
	public static void main(String[] args) {
		SpringApplication.run(HonorhubApplication.class, args);
	}

	// Seed a demo admin user for testing
	@Bean
	CommandLineRunner seed(UserRepository repo, PasswordEncoder encoder) {
		return args -> {
			repo.findByEmail("admin@honorhub.io").ifPresentOrElse(
					u -> {},
					() -> {
						User admin = new User();
						admin.setEmail("admin@honorhub.io");
						admin.setPassword(encoder.encode("admin123"));
						admin.setRole(Role.ADMIN);
						repo.save(admin);
					}
			);
		};
	}
}
