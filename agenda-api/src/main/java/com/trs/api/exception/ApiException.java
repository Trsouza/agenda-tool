package com.trs.api.exception;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.trs.api.exception.Erro.Campo;
import com.trs.domain.exception.EntidadeNaoEncontradaException;
import com.trs.domain.exception.NegocioException;

@ControllerAdvice
public class ApiException extends ResponseEntityExceptionHandler {

	@Autowired // Para injetar a dependência
	private MessageSource messageSource; // Interface para resolver mensagens

	@ExceptionHandler(NegocioException.class)
	public ResponseEntity<Object> handleNegocio(NegocioException ex, WebRequest request) {
		HttpStatus status = HttpStatus.BAD_REQUEST;

		Erro erro = new Erro();
		erro.setStatus(status.value());
		erro.setTitulo(ex.getMessage());
		erro.setDataHora(OffsetDateTime.now());

		return handleExceptionInternal(ex, erro, new HttpHeaders(), status, request);
	}
	
	@ExceptionHandler(EntidadeNaoEncontradaException.class)
	public ResponseEntity<Object> handleeEntidadeNaoEncontradaException(NegocioException ex, WebRequest request) {
		HttpStatus status = HttpStatus.NOT_FOUND;

		Erro erro = new Erro();
		erro.setStatus(status.value());
		erro.setTitulo(ex.getMessage());
		erro.setDataHora(OffsetDateTime.now());

		return handleExceptionInternal(ex, erro, new HttpHeaders(), status, request);
	}


	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		List<Campo> campos = new ArrayList<Erro.Campo>();

		for (ObjectError error : ex.getBindingResult().getAllErrors()) {
			String nome = ((FieldError) error).getField();
			String mensagem = messageSource.getMessage(error, LocaleContextHolder.getLocale());

			campos.add(new Erro.Campo(nome, mensagem));
		}

		Erro erro = new Erro();
		erro.setStatus(status.value());
		erro.setTitulo("Um ou mais campos estão inválidos. " + "Faça o preenchimento correto e tente novamente");
		erro.setDataHora(OffsetDateTime.now());
		erro.setCampos(campos);

		return super.handleExceptionInternal(ex, erro, headers, status, request);
	}
}
