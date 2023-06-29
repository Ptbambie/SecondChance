const getCategory = (req, res, next) => {
  const { ram, stockage, camera } = req.body;

  if (!ram || !memory || !stockage || !camera) {
    return res.status(400).json({ message: 'Please specify all fields' });
  }

  const valA = 0;
  if (ram == 1) {
    valA += 30;
  } else if (ram == 2) {
    valA += 40;
  } else if (ram == 3) {
    valA += 54;
  }

  const valB = 0;
  if (stockage == 16) {
    valB += 31;
  } else if (stockage == 32) {
    valB += 45;
  } else if (stockage == 64) {
    valB += 66;
  }

  const valC = 0;
  if (camera == 8) {
    valC += 40;
  } else if (camera == 12) {
    valC += 44;
  } else if (camera == 16) {
    valC += 49;
  }

  const valTotal = valA + valB + valC;
};
