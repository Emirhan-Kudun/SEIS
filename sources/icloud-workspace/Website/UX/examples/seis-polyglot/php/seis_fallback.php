<?php

function seis_static_fallback_status(array $checks): string
{
    return in_array('blocked', $checks, true) ? 'blocked' : 'ready';
}

