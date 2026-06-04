CREATE OR REPLACE PACKAGE readiness_signal AS
  ReadinessSignal CONSTANT VARCHAR2(32) := 'polyglot-foundation';
  lane CONSTANT VARCHAR2(16) := 'plsql';
  status CONSTANT VARCHAR2(16) := 'reference';
  reduced_motion_safe CONSTANT BOOLEAN := TRUE;
  runtime_weight CONSTANT VARCHAR2(32) := 'dependency-light';
END readiness_signal;
/
