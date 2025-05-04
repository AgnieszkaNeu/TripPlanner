package com.yourjourney.app.dto;

import java.time.LocalDateTime;

public record DestinationDto(Long tripId, String name, LocalDateTime startDate, LocalDateTime endDate) {
}
