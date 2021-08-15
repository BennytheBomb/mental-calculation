import * as tf from '@tensorflow/tfjs'

function buildModel(units: number, inputShape: number): tf.Sequential {
    const model = tf.sequential({
        layers: [tf.layers.dense({
            units: 10,
            inputShape: [20],
        })],
    });
    model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });
    return model;
}

async function train(model: tf.Sequential, input: tf.Tensor, output: tf.Tensor): Promise<void> {
    const history = await model.fit(input, output, {
        batchSize: 4,
        epochs: 3
    });
}

function predict(model: tf.Sequential, input: tf.Tensor): tf.Tensor | tf.Tensor[] {
    return model.predict(input);
}