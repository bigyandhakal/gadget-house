const Model = require("./category.model")


const create = async (payload)=>{
    payload.slug = payload.name.toLowerCase().replace(" ", "-")
    if (payload.slug){
        const isAvailable = await Model.findOne({slug: payload.slug})
        if(isAvailable) throw new Error("Category name already in use.")
    }
    return Model.create(payload);
}

const list = async (page = 1, limit = 10, search) => {
    const query = [];
    if (search?.name) {
      query.push({
        $match: {
          name: new RegExp(search?.name, "gi"),
        },
      });
    }
    query.push(
      {
        $sort: {
          created_at: -1,
        },
      },
      {
        $facet: {
          metadata: [
            {
              $count: "total",
            },
          ],
          data: [
            {
              $skip: (+page - 1) * +limit,
            },
            {
              $limit: +limit,
            },
          ],
        },
      },
      {
        $addFields: {
          total: {
            $arrayElemAt: ["$metadata.total", 0],
          },
        },
      },
      {
        $project: {
          total: 1,
          data: 1,
        },
      },
      {
        $project: {
          "data.password": 0,
        },
      }
    );
    const result = await Model.aggregate(query);
    return {
      data: result[0].data,
      total: result[0].total || 0,
      page: +page,
      limit: +limit,
    };
  };

const getById = (id)=>{
    return Model.findOne({_id:id})
}

const updateById = (id, payload)=>{
    return Model.findOneAndUpdate({_id: id}, payload, {new: true})
}

const remove = (id)=>{
    return Model.deleteOne({_id:id})
}

module.exports = {create, list, getById, updateById, remove}