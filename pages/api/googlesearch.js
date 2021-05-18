// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {

  fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.KEY}&cx=${process.env.CX}&q=amazon trending products`)
  .then(response => response.json())
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).send('Server Error',err));
}
