package com.andreas.mylife.financeservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
        "com.andreas.mylife.financeservice",
        "com.andreas.mylife.common"
})
public class FinanceserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinanceserviceApplication.class, args);
	}

}
