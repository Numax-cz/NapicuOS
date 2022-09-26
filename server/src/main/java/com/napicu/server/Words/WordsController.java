package com.napicu.server.Words;

import com.napicu.server.exception.RequestException;
import com.napicu.server.exception.RequestExceptionSchema;
import com.napicu.server.service.RateLimit;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import static com.napicu.server.exception.NapicuExceptions.NAPICU_TO_MANY_REQUESTS;

@RestController
public class WordsController {
  @Autowired
  private WordsService typeGameService;
  @Autowired
  private RateLimit rateLimit;

  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Vše je v pořádku"),
    @ApiResponse(responseCode = "429", description = "Příliš mnoho požadavků",
      content = @Content(mediaType = "application/json",schema = @Schema(implementation = RequestExceptionSchema.class))),
    @ApiResponse(responseCode = "500", description = "Nebylo možné získat slova",
      content = @Content(mediaType = "application/json",schema = @Schema(implementation = RequestExceptionSchema.class))),
  }
  )
  @GetMapping("/words")
  @ResponseBody
  public String[] getWords(@RequestParam int count) throws RequestException {
    if (rateLimit.getServiceBucket().tryConsume(1)) {
      return typeGameService.getWords(count).split(" \\| ");
    }
    throw new RequestException(HttpStatus.TOO_MANY_REQUESTS, NAPICU_TO_MANY_REQUESTS);
  }
}
