package com.emergency.model.service;

import java.util.List;

import com.emergency.model.dto.Disease;

public interface DiseaseService {

	// 질환 입력
	int insertDisease(Disease disease);

	// 질환 내역 수정
	int UpdateDisease(Disease disease);

	// 질환 내역 삭제
	int DeleteDisease(int diseaseId);

	// 질환 내역 가져오기
	List<Disease> selectAllDisease(String userId, String category);
}
