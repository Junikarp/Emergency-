package com.emergency.model.controller;

import com.emergency.model.dto.Disease;
import com.emergency.model.dto.DiseaseCode;
import com.emergency.model.service.DiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpTimeoutException;
import java.util.List;

@RestController
@RequestMapping("/disease-api")
@CrossOrigin("*")
public class DiseaseRestController {
	
	@Autowired
	DiseaseService diseaseService;
	
	// 질환 조회
	@GetMapping("/mypage/{userId}/{category}")
	public ResponseEntity<?> selectMyPage(@PathVariable @Param("userId") String userId,@PathVariable @Param("category") String category) {
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
	@DeleteMapping("/mypage/{diseaseId}")
	public ResponseEntity<?> deleteDisease(@PathVariable int diseaseId) {
		try {
			int result = diseaseService.deleteDisease(diseaseId);
			return new ResponseEntity<>(result, HttpStatus.OK);
		} catch(Exception e) {
			String errMsg = e.getMessage();
			return new ResponseEntity<>(errMsg, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/mypage/selectAll")
	public ResponseEntity<?> searchDiseaseAll() {
		try {
			List<DiseaseCode> list = diseaseService.selectAllDiseaseCode();
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			String errMsg = e.getMessage();
			return new ResponseEntity<>(errMsg, HttpStatus.NOT_FOUND);
		}
	}
}
