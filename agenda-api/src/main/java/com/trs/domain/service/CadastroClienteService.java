package com.trs.domain.service;

import java.time.OffsetDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trs.domain.exception.NegocioException;
import com.trs.domain.model.Cliente;
import com.trs.domain.repository.ClienteRepository;
import com.trs.domain.repository.ContatoRepository;

@Service
public class CadastroClienteService {
	@Autowired
	private ClienteRepository clienteRepository;
	
	@Autowired
	private ContatoRepository contatoRepository;
	
	public Cliente salvarCliente(Cliente cliente) {
//		Contato contato = contatoRepository.findById(cliente.getContato().getId())
//				.orElseThrow(() -> new NegocioException("Contato não encontrado"));
		
		Cliente clienteExistente = clienteRepository.findByEmail(cliente.getEmail()); // Não permite cadastrar um email repetido
		
		if (clienteExistente != null && !clienteExistente.equals(cliente)) {
			throw new NegocioException("Já existe um cliente cadastrado com este e-mail.");
		}
//		if(boo) {
//			cliente.setDataRegistro(LocalDateTime.now());
//		}
		//cliente.setContato(contato);
		cliente.setDataRegistro(OffsetDateTime.now());
//		cliente.setDataRegistro(OffsetDateTime.now());
		
		return clienteRepository.save(cliente);
	}
	
	public void excluirCliente(Long clienteId) {
		clienteRepository.deleteById(clienteId);
	}
}
