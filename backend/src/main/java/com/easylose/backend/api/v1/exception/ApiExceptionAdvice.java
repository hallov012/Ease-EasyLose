package com.easylose.backend.api.v1.exception;

import java.nio.file.AccessDeniedException;
import javax.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionAdvice {

  @ExceptionHandler({RuntimeException.class})
  public ResponseEntity<ApiExceptionEntity> exceptionHandler(
      HttpServletRequest request, final RuntimeException e) {
    return ResponseEntity.status(ExceptionEnum.RUNTIME_EXCEPTION.getStatus())
        .body(
            ApiExceptionEntity.builder()
                .errorCode(ExceptionEnum.RUNTIME_EXCEPTION.getCode())
                .errorMessage("잘못된 입력입니다.")
                .build());
  }

  @ExceptionHandler({AccessDeniedException.class})
  public ResponseEntity<ApiExceptionEntity> exceptionHandler(
      HttpServletRequest request, final AccessDeniedException e) {
    return ResponseEntity.status(ExceptionEnum.ACCESS_DENIED_EXCEPTION.getStatus())
        .body(
            ApiExceptionEntity.builder()
                .errorCode(ExceptionEnum.ACCESS_DENIED_EXCEPTION.getCode())
                .errorMessage("접근 권한이 없습니다.")
                .build());
  }

  @ExceptionHandler({Exception.class})
  public ResponseEntity<ApiExceptionEntity> exceptionHandler(
      HttpServletRequest request, final Exception e) {
    return ResponseEntity.status(ExceptionEnum.INTERNAL_SERVER_ERROR.getStatus())
        .body(
            ApiExceptionEntity.builder()
                .errorCode(ExceptionEnum.INTERNAL_SERVER_ERROR.getCode())
                .errorMessage("내부 서버 에러입니다. 관리자에게 문의하세요.")
                .build());
  }
}
