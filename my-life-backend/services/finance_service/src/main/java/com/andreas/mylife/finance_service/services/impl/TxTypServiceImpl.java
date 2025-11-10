package com.andreas.mylife.finance_service.services.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.andreas.mylife.finance_service.dto.request.TxTypeRequest;
import com.andreas.mylife.finance_service.dto.response.TxTypeResponse;
import com.andreas.mylife.finance_service.model.TxType;
import com.andreas.mylife.finance_service.repository.TxTypeRepository;
import com.andreas.mylife.finance_service.services.TxTypeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TxTypServiceImpl implements TxTypeService {

    private final TxTypeRepository txTypeRepository;

    @Override
    public List<TxTypeResponse> getUserTxTyoes(UUID userId) {
        return txTypeRepository.findAllByUserIdUnionGlobal(userId)
                .stream()
                .map(data -> new TxTypeResponse(data.getId(), data.getName(), data.getEffect())).toList();

    }

    @Override
    public void addTxType(UUID userId, TxTypeRequest request) {
        TxType txType = TxType.builder()
                .effect(request.isEffect())
                .name(request.getName())
                .userId(userId)
                .build();
        try {
            txTypeRepository.save(txType);
        } catch (Exception e) {

        }
    }

}
