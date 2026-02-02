import customerSchema from "./Schema.js";
import { generateToken } from "./middleware/auth.js";

export async function getdata(req, res) {
  try {
    const get = await customerSchema.find();

    res
      .status(200)
      .json({ message: "Successfully fetched data", dataforget: get });
  } catch (error) {
    console.error("Failed to fetch data -server", error);

    res.status(500).json({ message: "Failed to fetch data -server" });
  }
}

export async function getdatabyid(req, res) {
  try {
    const fetchdatabyid = await customerSchema.findById(req.params.id);

    if (!fetchdatabyid) {
      return res.status(404).json({ message: "Id not found" });
    }

    res.status(200).json({
      message: "Successfully fetched data by id",
      databyme: fetchdatabyid,
    });
  } catch (error) {
    console.error("failed to get data by id", error);

    res.status(500).json({ message: "failed to get data by id gotit" });
  }
}

export async function postdataregister(req, res) {
  try {
    const { Email, Name, Cart, Allproducts, trackingid } = req.body;

    const authuser = await customerSchema.findOne({ Email });

    if (authuser) {
      return res.status(400).json({ message: "user already exist" });
    }

    const postdata = new customerSchema(req.body); //create

    const savepostdata = await postdata.save(); //save()

    const token = generateToken(savepostdata._id); //gen token

    res.status(201).json({ savepostdata: savepostdata, token: token });
  } catch (error) {
    console.error("Failed to save data on post", error);

    res.status(500).json({ message: "Failed to save data on post" });
  }
}

export async function updatedata(req, res) {
  try {
    const putdata = await customerSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!putdata) {
      return res
        .status(404)
        .json({ message: "ID for updating data not found" });
    }

    res
      .status(200)
      .json({ message: "Successfully updated data ", updateddata: putdata });
  } catch (error) {
    res.status(500).json({ message: "Failed to update data" });
    console.error("Failed to update data", error);
  }
}

export async function deletedata(req, res) {
  try {
    const { Email, Name } = req.body;

    const find = await customerSchema.findOne({ Email });

    if (find) {
      const check = await find.matchPassword(Name);

      if (!check) {
        return res.status(401).json({ message: "Password is no valid" });
      }

      const deleteddata = await customerSchema.findByIdAndDelete(find._id);

      if (!deleteddata) {
        return res
          .status(501)
          .json({ message: "Failed to delete the account" });
      }

      return res.status(200).json({ message: "Successfully deleted account" });
    } else {
      return res
        .status(404)
        .json({ message: "Email for deleting account not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Failed to delete the account" });

    console.error("Failed to delete the account", error);
  }
}

// LOGIN

export async function postdatalogin(req, res) {
  try {
    const { Email, Name, Cart, Allproducts, trackingid, password } = req.body;

    if (!Email || !password) {
      return res.status(400).json({ message: "please field all field" });
    }

    const authuser = await customerSchema.findOne({ Email });

    if (!authuser || !(await authuser.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credencials  " });
    }

    const token = generateToken(authuser._id);

    res.status(200).json({
      id: authuser._id,
      Name: Name,
      Email: Email,
      token: token,
    });

    const postdata = new customerSchema(req.body);
  } catch (error) {
    console.error("Failed to save data on post", error);

    res.status(500).json({ message: "Failed to save data on post" });
  }
}

//Me

export async function protect(req, res, next) {
  if (req.authu) {
    return res.status(200).json({ data: req.authu });
    // if next is called it will continue to next get req
  } else {
    return res.status(404).json({ message: "User not found in request" });
  }
}

export async function updatepost(req, res) {
  const { Cart, position } = req.body;


  try {
    const postup = await customerSchema.findByIdAndUpdate(
      req.params.id,

      {
        $push: {
          Cart: { $each: Cart, $position: position }, 
        }
      },
      { new: true },
    );

    if (!postup) {
      return res.status(404).json({ message: "Failed to poste item" });
    }

    res.status(201).json({ message: "posted item Successfully", data: postup });
  } catch (error) {
    res.status(500).json({ message: "Failed to push data" });
  }
}







export async function updatepostforcheck(req, res) {
  const { proch } = req.body;
  const ids = proch.map((item) => item.id);

  if (!ids) return;


  try {
    const postup = await customerSchema.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          Cart: { id: { $in: ids } } 
        }
      },
      { new: true },
    );

    if (!postup) {
      return res
        .status(404)
        .json({ message: "Failed to remove object out of cart id not found" });
    }

    res.status(201).json({
      message: "Removed item Successfully from the cart",
      data: postup,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to pull obj", error });
  }
}

//How do we get access to req and res inside a function in Express?
//ans- file:///Users/sanjaykardile/Desktop/Screenshot%202025-12-27%20at%2012.42.48%20PM.png
