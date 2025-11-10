package com.andreas.mylife.finance_service.dto.projection;

public interface TxTypeProjection {
    Long getId();
    String getName();
    Boolean getEffect();
    String getType(); // Tambahan untuk membedakan sumber data (Global / Personal)
}