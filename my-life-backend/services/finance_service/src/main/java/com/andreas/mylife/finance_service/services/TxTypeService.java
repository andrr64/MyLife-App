package com.andreas.mylife.finance_service.services;

import java.util.List;
import java.util.UUID;

import com.andreas.mylife.finance_service.dto.request.TxTypeRequest;
import com.andreas.mylife.finance_service.dto.response.TxTypeResponse;

public interface TxTypeService {
    List<TxTypeResponse> getUserTxTyoes(UUID userId);
    void addTxType(UUID userId, TxTypeRequest request);
}
