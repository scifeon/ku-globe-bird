SELECT
	tax.ID,
	tax.Name AS LatinName,
	tax.FamilyName,
	tax.GenusName,
	tax.SpeciesName,
	COUNT(smp.ID) AS SampleCount,
	JSON_VALUE(tax.Attributes,
	'$.speciesEnglishName') AS SpeciesEnglishName,
	lsmp.ID AS LatestSampleID,
	lsmp.Name AS LatestSampleName,
	JSON_VALUE(lsmp.Attributes,
	'$.sampleDataLevel') AS LatestSampleDataLevel
FROM
	Bio_TaxonomyItem AS tax CROSS APPLY (
	SELECT
		TOP 1 latestSmp.Name,
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
	lsmp.ID,
	lsmp.Name,
	lsmp.Attributes
