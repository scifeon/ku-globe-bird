SELECT r.*,
    g.name AS GenomeName
FROM Bio_Genome g
    JOIN Assay_ResultFlex r ON r.SubjectID = g.ID