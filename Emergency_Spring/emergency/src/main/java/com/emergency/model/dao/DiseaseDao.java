package com.emergency.model.dao;

import java.util.List;

import com.emergency.model.dto.Disease;

public interface DiseaseDao {
	// 질환 입력
	int insertDisease(Disease disease);
	
	// 질환 내역 수정
	int updateDisease(Disease disease);
	
	// 질환 내역 삭제
	int deleteDisease(int diseaseId);
	
	// 질환 내역 가져오기
	List<Disease> selectAllDisease(String userId, String category);
}
