package com.andreas.mylife.common.util;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class DateTimeUtils {
    private static final ZoneId ZONE_JAKARTA = ZoneId.of("Asia/Jakarta");

    public static ZonedDateTime toStartOfMonth(LocalDate ref) {
        return ref.withDayOfMonth(1).atStartOfDay(ZONE_JAKARTA);
    }

    public static ZonedDateTime toEndOfMonth(LocalDate ref) {
        return ref.withDayOfMonth(ref.lengthOfMonth())
                .atTime(23, 59, 59, 999_999_999)
                .atZone(ZONE_JAKARTA);
    }

    public static ZonedDateTime nowJakarta() {
        return ZonedDateTime.now(ZONE_JAKARTA);
    }

    // ✅ tambahan baru
    public static ZonedDateTime toEndDayOfMonth(LocalDate ref) {
        return ref.withDayOfMonth(ref.lengthOfMonth())
                .atTime(23, 59, 59, 999_999_999)
                .atZone(ZONE_JAKARTA);
    }

    public static ZonedDateTime toEndDayOfMonth() {
        LocalDate today = LocalDate.now(ZONE_JAKARTA);
        return toEndDayOfMonth(today);
    }
}
