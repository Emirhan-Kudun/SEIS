DECLARE @ReadinessSignal NVARCHAR(32) = N'polyglot-foundation';
DECLARE @lane NVARCHAR(16) = N'tsql';
DECLARE @status NVARCHAR(16) = N'reference';
DECLARE @reduced_motion_safe BIT = 1;
DECLARE @runtime_weight NVARCHAR(32) = N'dependency-light';

SELECT
  @ReadinessSignal AS ReadinessSignal,
  @lane AS lane,
  @status AS status,
  @reduced_motion_safe AS reduced_motion_safe,
  @runtime_weight AS runtime_weight;
