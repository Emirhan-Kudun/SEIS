<?php
declare(strict_types=1);

function uix_polyglot_health(int $languageCount = 14): array
{
    return [
        "ok" => $languageCount >= 12,
        "service" => "uix-apps-polyglot-fallback",
        "languageCount" => $languageCount,
        "mode" => "shared-hosting-compatible"
    ];
}

if (PHP_SAPI === "cli") {
    echo json_encode(uix_polyglot_health(), JSON_UNESCAPED_SLASHES) . PHP_EOL;
}
