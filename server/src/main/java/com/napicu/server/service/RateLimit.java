package com.napicu.server.service;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Refill;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Objects;

@Service
public class RateLimit {
    private final Bucket bucket;
    private final String defaultRateLimits = "40";

    RateLimit(@Value("${api.limits}") String limits) {
        if (Objects.equals(limits, "")) {
            limits = defaultRateLimits;
            new NapicuPrint().printInfo("Limits are not set, the limits have been set at " + defaultRateLimits);
        }

        Bandwidth limit = Bandwidth.classic(Integer.parseInt(limits), Refill.greedy(Integer.parseInt(limits), Duration.ofMinutes(1)));
        this.bucket = Bucket4j.builder()
                .addLimit(limit)
                .build();
    }

    public Bucket getServiceBucket() {
        if(!this.bucket.tryConsume(1)) {
            new NapicuPrint().printInfo("LIMIT - BLOCKED");
        }
        return this.bucket;
    }
}
