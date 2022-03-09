--SELECT * FROM questions WHERE product_id = $1 ORDER BY question_helpfulness DESC

-- first query

SELECT product_id, json_agg(json_build_object(
      'question_id', id,
      'question_body', question_body,
      'question_date', question_date,
      'asker_name', asker_name,
      'question_helpfulness', question_helpfulness,
      'reported', reported,
      'answers', (SELECT coalesce(json_object_agg (answers.id, json_build_object (
        'id', id,
        'body', body,
        'date', date,
        'answerer_name', answerer_name,
        'helpfulness', helpfulness,
        'photos', (SELECT coalesce(json_agg (json_build_object (
          'id', answers_id,
          'url', url)
      ), '[]')
     FROM photos WHERE answers.id = answers_id)
     )), '{}')
     FROM answers WHERE questions.id = answers.question_id
     )
     ) ORDER BY question_helpfulness DESC)
     as results FROM questions WHERE product_id = $1 AND reported = false GROUP BY product_id


     --