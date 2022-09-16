package com.napicu.server.Weather;


import com.napicu.server.exception.RequestException;
import com.napicu.server.exception.RequestExceptionSchema;
import com.napicu.server.service.NapicuPrint;
import com.napicu.server.service.RateLimit;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.Objects;

import static com.napicu.server.exception.NapicuExceptions.NAPICU_TO_MANY_REQUESTS;


@RestController
public class WeatherController {

    @Autowired
    private RateLimit rateLimit;
    @Value("${api.keys.open-weather}")
    private String api_key;
    @Autowired
    private WeatherService pocasiService;
    @PostConstruct
    public void init() {
        if (Objects.equals(this.api_key, "")) {
            new NapicuPrint().printError("OpenWeather", "Open weather key is not set");
            Runtime.getRuntime().halt(0);
        }
    }


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vše je v pořádku"),
            @ApiResponse(responseCode = "429", description = "Příliš mnoho požadavků",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = RequestExceptionSchema.class))),
            @ApiResponse(responseCode = "400", description = "Nebylo možné nalést požadované město",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = RequestExceptionSchema.class))),
            @ApiResponse(responseCode = "500", description = "Chyba serveru",
                    content = @Content(mediaType = "application/json",schema = @Schema(implementation = RequestExceptionSchema.class)))
        }
    )
    @GetMapping("/weather")
    @ResponseBody
    public WeatherResponseModel get(@RequestParam String city, @RequestParam String language_code) {
        if (rateLimit.getServiceBucket().tryConsume(1)) {
            return this.pocasiService.getOpenWeatherData(this.api_key, city, language_code);
        }
        throw new RequestException(HttpStatus.TOO_MANY_REQUESTS, NAPICU_TO_MANY_REQUESTS);
    }


  @ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Vše je v pořádku")
    }
  )
  @GetMapping("/")
  public ResponseEntity getSatus() {
    return ResponseEntity.ok().build();
  }
}
