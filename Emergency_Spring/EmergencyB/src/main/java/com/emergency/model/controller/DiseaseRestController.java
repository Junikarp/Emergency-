package com.emergency.model.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.emergency.model.dto.Disease;
import com.emergency.model.service.DiseaseService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api")
@Api(tags = "유저 질환 관리")
@CrossOrigin("*")
public class DiseaseRestController {
	
	@Autowired
	DiseaseService diseaseService;
	
	// 질환 조회
	@GetMapping("/mypage/{userId}/{category}")
	@ApiOperation(value = "마이 페이지")
	public ResponseEntity<?> selectMyPage(@PathVariable String userId,@PathVariable String category) {
		try {
			List<Disease> list = diseaseService.selectAllDisease(userId, category);
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch(Exception e) {
			String errMsg = e.getMessage();
			return new ResponseEntity<>(errMsg, HttpStatus.NOT_FOUND);
		}
	}
	
	// 질환 추가
	@PostMapping("/mypage")
	@ApiOperation(value = "질환 추가")
	public ResponseEntity<?> insertDisease(@RequestBody Disease disease){
		try {
			int result = diseaseService.insertDisease(disease);
			if(result == 1) {
				return new ResponseEntity<>(result, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
		} catch(Exception e) {
			String errMsg = e.getMessage();
			return new ResponseEntity<>(errMsg, HttpStatus.BAD_REQUEST);
		}
	}
	
	// 질환 삭제
	@DeleteMapping("/mypage")
	@ApiOperation(value = "질환 삭제")
	public ResponseEntity<?> deleteDisease(@PathVariable int diseaseId) {
		try {
			int result = diseaseService.DeleteDisease(diseaseId);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch(Exception e) {
			String errMsg = e.getMessage();
			return new ResponseEntity<>(errMsg, HttpStatus.BAD_REQUEST);
		}
	}
}
