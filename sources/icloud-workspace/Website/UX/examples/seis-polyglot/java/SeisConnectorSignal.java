package seis.polyglot;

public record SeisConnectorSignal(String name, String status) {
    public boolean needsCredentials() {
        return "needs_credentials".equals(status);
    }
}

