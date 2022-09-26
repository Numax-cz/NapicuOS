package com.napicu.server.Words;

import com.napicu.server.exception.NapicuExceptions;
import com.napicu.server.exception.RequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import static java.nio.charset.StandardCharsets.ISO_8859_1;
import static java.nio.charset.StandardCharsets.UTF_8;

@Service
public class WordsService {
  public String getWords(int count) {
    try {
      final String url = "http://slova.cetba.eu/generate.php?number=" + count;
      RestTemplate restTemplate = new RestTemplate();
      ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
      String data = responseEntity.getBody();
      byte[] ptext = data.getBytes(ISO_8859_1);
      String value = new String(ptext, UTF_8);
      return value;
    } catch (Exception error) {

      throw new RequestException(HttpStatus.INTERNAL_SERVER_ERROR, NapicuExceptions.NAPICU_SERVER_ERROR);
    }
  }
}
