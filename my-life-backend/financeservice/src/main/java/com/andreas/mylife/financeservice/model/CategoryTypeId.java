package com.andreas.mylife.financeservice.model;

public enum CategoryTypeId {
    EXPENSE(0),
    INCOME(1),
    TRANSFER(2);

    private final int id;

    CategoryTypeId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}
