import processRecipies from "../processRecipies.js";

function recipies(router) {

  router.post("/recipies", async (req, res) => {

    const { style, language } = req.query;
    const { pantryItems } = req.body;

    console.log(`Request received: Get ${style} recipies `);
    const json = await processRecipies(pantryItems, style, language);

    res.json({
      status: 200,
      result: json,
    });
  });

  return router;
}

export default recipies;