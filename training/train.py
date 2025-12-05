"""
train_xgb.py
Train an XGBoost regression model for rice yield using the existing dataset.

Dataset:
    /training/tamil_nadu_rice_yield_dataset.csv

Outputs:
- backend/rice_yield_model_xgb.pkl
- backend/feature_importances.png
- xgb_test_predictions.csv
"""

import os
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, KFold, RandomizedSearchCV, cross_validate
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings("ignore", category=UserWarning)

# --------- Configuration ---------
DATA_PATH = "Merged_TamilNaduRice_Climate_FULL.csv"  # merged dataset in current folder
OUTPUT_MODEL_PATH = os.path.join("..", "backend", "rice_yield_model_xgb.pkl")
FI_PLOT_PATH = os.path.join("..", "backend", "feature_importances.png")
RANDOM_STATE = 42
N_SPLITS = 5
# ---------------------------------

# 1️⃣ Load dataset
df = pd.read_csv(DATA_PATH)
print("Loaded dataset:", df.shape)
print(df.head())

# 2️⃣ Features / Target
TARGET = "Rice_Yield_kg_per_ha"
if TARGET not in df.columns:
    raise ValueError(f"Target column '{TARGET}' not found in dataset.")

df = df.drop(columns=["state", "crop"], errors="ignore")

X = df.drop(columns=[TARGET])
y = df[TARGET].astype(float)

numeric_cols = X.select_dtypes(include=np.number).columns.tolist()
categorical_cols = X.select_dtypes(include=["object"]).columns.tolist()

print("\nNumeric features:", numeric_cols)
print("Categorical features:", categorical_cols)

# 3️⃣ Data Preprocessing
numeric_transformer = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])

categorical_transformer = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("onehot", OneHotEncoder(handle_unknown="ignore", sparse_output=False))
])

preprocessor = ColumnTransformer([
    ("num", numeric_transformer, numeric_cols),
    ("cat", categorical_transformer, categorical_cols)
])

# 4️⃣ Model Pipeline
xgb = XGBRegressor(
    objective="reg:squarederror",
    random_state=RANDOM_STATE,
    n_jobs=-1
)

pipe = Pipeline([
    ("preprocessor", preprocessor),
    ("regressor", xgb)
])

# 5️⃣ Baseline CV
cv = KFold(n_splits=N_SPLITS, shuffle=True, random_state=RANDOM_STATE)
scoring = {"rmse": "neg_root_mean_squared_error", "r2": "r2"}

print("\nRunning baseline metrics...")
cv_results = cross_validate(pipe, X, y, cv=cv, scoring=scoring, n_jobs=-1)
print(f"Baseline RMSE: {-cv_results['test_rmse'].mean():.3f}")
print(f"Baseline R2: {cv_results['test_r2'].mean():.3f}")

# 6️⃣ Hyperparameter Search
param_dist = {
    "regressor__n_estimators": [200, 400, 600],
    "regressor__max_depth": [4, 6, 8],
    "regressor__learning_rate": [0.03, 0.05, 0.1],
    "regressor__subsample": [0.7, 0.9, 1.0],
    "regressor__colsample_bytree": [0.6, 0.8, 1.0]
}

print("\nRunning RandomizedSearchCV...")
rs = RandomizedSearchCV(
    pipe, param_dist,
    n_iter=15, scoring="neg_root_mean_squared_error",
    cv=cv, verbose=1, random_state=RANDOM_STATE, n_jobs=-1
)
rs.fit(X, y)
best_pipe = rs.best_estimator_

print("\nBest parameters:", rs.best_params_)
print("Best RMSE:", -rs.best_score_)

# 7️⃣ Final Train-Test Evaluation
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15, random_state=RANDOM_STATE)
best_pipe.fit(X_train, y_train)
y_pred = best_pipe.predict(X_test)

print("\nFinal Performance:")
print("Test RMSE:", mean_squared_error(y_test, y_pred, squared=False))
print("Test R2:", r2_score(y_test, y_pred))

# 8️⃣ Save Model
joblib.dump(best_pipe, OUTPUT_MODEL_PATH)
print("\nSaved model to:", OUTPUT_MODEL_PATH)

# 9️⃣ Feature Importance Plot
ohe = best_pipe.named_steps["preprocessor"].named_transformers_["cat"].named_steps["onehot"]
feature_names = list(numeric_cols) + list(ohe.get_feature_names_out(categorical_cols))

importances = best_pipe.named_steps["regressor"].feature_importances_
fi = pd.Series(importances, index=feature_names).sort_values().tail(25)

plt.figure(figsize=(8, 10))
fi.plot(kind="barh")
plt.title("Top Feature Importances")
plt.tight_layout()
plt.savefig(FI_PLOT_PATH)
print("Saved feature importances to:", FI_PLOT_PATH)

# 🔟 Save Predictions Sample
pd.DataFrame({"actual": y_test, "predicted": y_pred}).to_csv("xgb_test_predictions.csv", index=False)
print("Saved sample predictions to xgb_test_predictions.csv")

print("\n🎯 Training Completed Successfully! 🚀")
