package com.trs.domain.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trs.domain.exception.EntidadeNaoEncontradaException;
import com.trs.domain.exception.NegocioException;
import com.trs.domain.model.Cliente;
import com.trs.domain.model.Contato;
import com.trs.domain.repository.ClienteRepository;
import com.trs.domain.repository.ContatoRepository;

@Service
public class CadastroContatoService {

	
	@Autowired
	private ContatoRepository contatoRepository;
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	public Contato salvarContato(Contato contato, Long clienteId) {
		Cliente cliente= clienteRepository.findById(clienteId)
				.orElseThrow(() -> new NegocioException("Cliente não encontrado"));
		Contato contatoExistente = contatoRepository.findByEmail(contato.getEmail()); // Não permite cadastrar um email repetido
		
		if (contatoExistente != null && !contatoExistente.equals(contato)) {
			throw new NegocioException("Já existe um contato cadastrado com este e-mail.");
		}
		contato.setCliente(cliente);
		return contatoRepository.save(contato);
	}
	
	
	public Contato atualizarContato(Contato contato) {
		Contato contatoExistente = contatoRepository.findByEmail(contato.getEmail()); // Não permite cadastrar um email repetido
		
		if (contatoExistente != null && !contatoExistente.equals(contato)) {
			throw new NegocioException("Já existe um contato cadastrado com este e-mail.");
		}
		return contatoRepository.save(contato);
	}
	
	
	public List<Contato>  buscarContatosCliente(Long clienteId) {
		Cliente cliente= clienteRepository.findById(clienteId)
				.orElseThrow(() -> new EntidadeNaoEncontradaException("Cliente não encontrado"));
		return cliente.getContatos();
	}
	
	public void excluirContato(Long contatoId) {
		contatoRepository.deleteById(contatoId);
	}
	

}
