package com.trs.domain.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.trs.domain.model.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
//	List<Cliente> findByNome(String nome);
//	List<Cliente> findByNomeContaining(String nome);
	Cliente findByEmail(String email);
}
