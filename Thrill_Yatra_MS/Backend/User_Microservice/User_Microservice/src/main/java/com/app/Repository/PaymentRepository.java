
package com.app.Repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.Entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

	@Query("select p from Payment p " +
		       "join fetch p.booking b " +
		       "join fetch b.user u " +
		       "join fetch b.adventure a " +
		       "where p.paymentStatus = :status")
		List<Payment> findAllPaidWithDetails(@Param("status") String status);

    boolean existsByBookingId(Long bookingId);
}
