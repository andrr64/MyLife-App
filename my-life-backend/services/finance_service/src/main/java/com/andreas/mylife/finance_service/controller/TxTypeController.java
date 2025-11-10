package com.andreas.mylife.finance_service.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.andreas.mylife.finance_service.common.ApiPath;
import com.andreas.mylife.finance_service.dto.request.TxTypeRequest;
import com.andreas.mylife.finance_service.dto.response.ApiResponse;
import com.andreas.mylife.finance_service.dto.response.TxTypeResponse;
import com.andreas.mylife.finance_service.services.TxTypeService;
import com.andreas.mylife.finance_service.util.UserIdExtractor;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(ApiPath.TX_TYPE)
@RequiredArgsConstructor
public class TxTypeController {

    private final TxTypeService txTypeService;

    @GetMapping("/get-tx-types")
    public ApiResponse<List<TxTypeResponse>> getTxTypes() {
        return ApiResponse.success(txTypeService.getUserTxTyoes(
                UserIdExtractor.extractUserId()));
    }

    @PostMapping("/add-tx-type")
    public ApiResponse<Object> addTxTypes(
        @Valid @RequestBody  TxTypeRequest request
    ) {
        txTypeService.addTxType(
            UserIdExtractor.extractUserId(),
            request
        );
        return ApiResponse.success("Ok");
    }
}