package com.trs.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.trs.domain.model.Cliente;
import com.trs.domain.model.Contato;

@Repository
public interface ContatoRepository extends JpaRepository<Contato, Long> {
	Contato findByEmail(String email);
}
