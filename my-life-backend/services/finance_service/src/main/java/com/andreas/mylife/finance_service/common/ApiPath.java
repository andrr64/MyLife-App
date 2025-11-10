package com.andreas.mylife.finance_service.common;

public final class ApiPath {

    private ApiPath() {
    }

    public static final String BASE_API = "/api/v1/finance-service";

    public static final String TX_TYPE = BASE_API + "/transaction-type";
    public static final String TX_CATEGORY = BASE_API + "/transaction-category";
    public static final String ACCOUNT = BASE_API + "/account";
}
