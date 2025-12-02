package com.andreas.mylife.financeservice.common;

public final class ApiPath {

    private ApiPath() {
    }

    public static final String BASE_API = "/api/v1/finance-service";

    public static final String TX_TYPE = BASE_API + "/transaction-type";
    public static final String CATEGORY = BASE_API + "/category";
    public static final String ACCOUNT = BASE_API + "/account";
    public static final String TRANSACTION = BASE_API + "/transaction";
    public static final String DASHBOARD = BASE_API + "/dashboard";
}
