SELECT
	tax.ID,
	tax.Name AS LatinName,
	tax.FamilyName,
	tax.GenusName,
	tax.SpeciesName,
	COUNT(smp.ID) AS SampleCount,
	JSON_VALUE(tax.Attributes, '$.speciesEnglishName') AS SpeciesEnglishName,
	lsmp.Name AS LatestSampleName,
	lsmp.ID AS LatestSampleID,
	JSON_VALUE(lsmp.Attributes,	'$.statusProgress') AS LatestStatusProgress,
	JSON_VALUE(lsmp.Attributes,	'$.statusCovered') AS LatestStatusCovered,
	JSON_VALUE(lsmp.Attributes,	'$.statusDna') AS LatestStatusDna,
	JSON_VALUE(lsmp.Attributes,	'$.statusSequencing') AS LatestStatusSequencing,
	JSON_VALUE(lsmp.Attributes,	'$.statusAssembly') AS LatestStatusAssembly
FROM
	Bio_TaxonomyItem AS tax OUTER APPLY (
	SELECT
		TOP 1 latestSmp.ID,
		latestSmp.Name,
		latestSmp.Attributes
	FROM
		PnS_Sample AS latestSmp
	WHERE
		latestSmp.TaxonomyItemID = tax.ID
	ORDER BY
		CreatedUtc DESC ) AS lsmp
LEFT JOIN PnS_Sample AS smp ON
	smp.TaxonomyItemID = tax.ID
GROUP BY
	tax.ID,
	tax.name,
	tax.FamilyName,
	tax.GenusName,
	tax.SpeciesName,
	tax.Attributes,
	lsmp.Name,
	lsmp.ID,
	lsmp.Attributes
