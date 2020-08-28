package com.trs.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.trs.domain.model.Contato;
import com.trs.domain.repository.ContatoRepository;
import com.trs.domain.service.ContatoService;


@RestController @CrossOrigin(origins = "*")
@RequestMapping("api/contatos")
public class ContatoController {

	@Autowired
	private ContatoRepository contatoRepository;
	
	@Autowired
	private ContatoService cadastroContatoService;

	@GetMapping
	public List<Contato> listar() {
		return contatoRepository.findAll();
	}

	@GetMapping("/clientes/{clienteId}/contatos")
	public List<Contato> buscar(@PathVariable Long clienteId) {
		return cadastroContatoService.buscarContatosCliente(clienteId);
	}

	
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/clientes/{clienteId}/contatos")
	public Contato adicionar(@Valid @RequestBody Contato contato, @PathVariable Long clienteId) {
		return cadastroContatoService.salvarContato(contato, clienteId);
	}
	
	
	@PutMapping("/{contatoId}")
	public ResponseEntity<Contato> atualizar(@Valid @PathVariable Long contatoId, @RequestBody Contato contato) {

		if (!contatoRepository.existsById(contatoId)) {
			return ResponseEntity.notFound().build();
		}

		contato.setId(contatoId);
		contato = cadastroContatoService.atualizarContato(contato);

		return ResponseEntity.ok(contato);
	}

	@DeleteMapping("/{contatoId}")
	public ResponseEntity<Void> remover(@PathVariable Long contatoId) {
		if (!contatoRepository.existsById(contatoId)) {
			return ResponseEntity.notFound().build();
		}

		cadastroContatoService.excluirContato(contatoId);

		return ResponseEntity.noContent().build();
	}
}
