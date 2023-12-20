package com.emergency.model.controller;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.emergency.model.dto.User;
import com.emergency.model.service.UserService;
import com.emergency.model.util.JwtUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api")
@Api(tags = "유저 다루는 거에용")
@CrossOrigin("*")
public class UserRestController {

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private UserService userService;

	@Autowired
	private JwtUtil jwtUtil;

	// 마이 페이지
	@GetMapping("/user/{id}")
	@ApiOperation(value = "마이 페이지")
	public ResponseEntity<?> selectUser(@PathVariable String id) {
		try {
			User user = userService.selectUser(id);
			return new ResponseEntity<>(user, HttpStatus.OK);
		} catch (Exception e) {
			String errMsg = e.getMessage();
			return new ResponseEntity<>(errMsg, HttpStatus.NOT_FOUND);
		}
	}

	// 회원 가입
	@PostMapping("/user")
	@ApiOperation(value = "회원 가입")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		try {
			int result = userService.createUser(user);
			if (result == 1) {
				return new ResponseEntity<>(result, HttpStatus.CREATED);
			} else {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
		} catch (Exception e) {
			String errMsg = e.getMessage();
			return new ResponseEntity<>(errMsg, HttpStatus.NO_CONTENT);
		}
	}

	// 로그인
	@PostMapping("/login")
	@ApiOperation(value = "로그인")
	public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
		Map<String, Object> result = new HashMap<String, Object>();

		HttpStatus status = null;
		try {

			User loginUser = userService.selectUser(user.getId());
			if (loginUser != null && loginUser.getPassword().equals(user.getPassword())) {
				result.put("access-token", jwtUtil.createToken("id", user.getId()));
				result.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} else {
				result.put("message", FAIL);
				status = HttpStatus.NO_CONTENT;
			}
		} catch (UnsupportedEncodingException e) {
			result.put("message", FAIL);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}

		return new ResponseEntity<Map<String, Object>>(result, status);
	}

	@GetMapping("/logout")
	@ApiOperation(value = "로그아웃")
	public ResponseEntity<?> logout(HttpSession session) {

		session.invalidate();
		return new ResponseEntity<>(HttpStatus.OK);

	}

	// 회원 가입
	@DeleteMapping("/user/{id}")
	@ApiOperation(value = "회원 탈퇴")
	public ResponseEntity<?> deleteUser(@PathVariable @RequestBody String id) {
		int result = userService.deleteUser(id);
		if (result == 1) {
			return new ResponseEntity<>(result, HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	// 회원 정보 수정
	@PutMapping("/user")
	@ApiOperation(value = "회원 정보 수정")
	public ResponseEntity<?> updateUser(@RequestBody User user) {
		int result = userService.updateUser(user);
		if (result == 1) {
			return new ResponseEntity<>(result, HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
