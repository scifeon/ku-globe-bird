SELECT
	t.id + '_' + si.id AS id,
	t.id AS TaxonomyItemID,
	t.name AS LatinName,
	t.FamilyName,
	t.GenusName,
	t.SpeciesName,
	t.SubSpeciesName,
	json_value(t.attributes, '$.speciesEnglishName') AS CommonName,
	si.id AS SampleID,
	a.id AS AnimalID,
	e.id AS ExperimentID,
	e.name AS ExperimentName,
	(
	SELECT
		status
	FROM
		WFM_Step
	WHERE
		ExperimentID = e.id
		AND name = 'Tissue Sample') AS TissueSampleStatus,
	(
	SELECT
		status
	FROM
		WFM_Step
	WHERE
		ExperimentID = e.id
		AND name = 'Library Preparation') AS LibraryPreparationStatus,
	(
	SELECT
		status
	FROM
		WFM_Step
	WHERE
		ExperimentID = e.id
		AND name = 'Sequencing') AS SequencingStatus,
	(
	SELECT
		status
	FROM
		WFM_Step
	WHERE
		ExperimentID = e.id
		AND name = 'Bioinformatics') AS BioinformaticsStatus,
	(
	SELECT
		status
	FROM
		WFM_Step
	WHERE
		ExperimentID = e.id
		AND name = 'Validation') AS ValidationStatus
FROM
	Bio_TaxonomyItem t
LEFT JOIN PnS_Animal a ON
	a.TaxonomyItemID = t.id
LEFT JOIN WFM_V_StepSampleInput si ON
	si.AnimalID = a.ID
	AND si.RequestID IS NOT NULL
	AND InputPosition = 0
LEFT JOIN WFM_Step st ON
	st.ID = si.StepID
LEFT JOIN WFM_Experiment e ON
	e.ID = st.ExperimentID;
