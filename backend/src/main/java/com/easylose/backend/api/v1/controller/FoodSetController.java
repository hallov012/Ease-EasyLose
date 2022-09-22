package com.easylose.backend.api.v1.controller;

import com.easylose.backend.api.v1.service.FoodSetService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@Slf4j
@RestController
@RequestMapping("api/v1/foodset")
@RequiredArgsConstructor
public class FoodSetController {

    private final FoodSetService foodSetService;

    @GetMapping("")
    @ApiOperation(value="유저의 개인 식단", notes="유저의 개인 식단 전체 목록을 불러온다")
    public ResponseEntity<Collection> getFoodSetAll(@AuthenticationPrincipal Long id){

        Collection response = foodSetService.getFoodSetAll(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
