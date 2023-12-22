package com.emergency.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emergency.model.dao.DiseaseDao;
import com.emergency.model.dto.Disease;

@Service
public class DiseaseServiceImpl implements DiseaseService {

	@Autowired
	DiseaseDao diseaseDao;
	
	@Override
	public int insertDisease(Disease disease) {
		return diseaseDao.insertDisease(disease);
	}

	@Override
	public int updateDisease(Disease disease) {
		return diseaseDao.updateDisease(disease);
	}

	@Override
	public int deleteDisease(int diseaseId) {
		return diseaseDao.deleteDisease(diseaseId);
	}

	@Override
	public List<Disease> selectAllDisease(String userId, String category) {
		return diseaseDao.selectAllDisease(userId, category);
	}
	
}