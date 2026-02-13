package com.app.Service;

import java.util.List;

import com.app.DTO.PaymentRequestDto;
import com.app.DTO.PaymentResponseDto;
import com.app.Entity.Payment;

public interface PaymentService {

	Payment savePayment(PaymentRequestDto dto);

	List<PaymentResponseDto> getAllPaidPayments();

}
